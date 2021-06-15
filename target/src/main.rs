use std::io::stdin;
use std::sync::mpsc::channel;
use std::thread;

use serde::{Serialize, Deserialize};
use serde_json::json;

use websocket::client::ClientBuilder;
use websocket::{Message, OwnedMessage};

const CONNECTION: &'static str = "ws://localhost:5000";

#[derive(Serialize, Deserialize)]
struct Command {
    name: String,
    args: Vec<String>,
    from: String,
    to: String,
}

fn main() {
	println!("Connecting to {}", CONNECTION);

	let client = ClientBuilder::new(CONNECTION)
		.unwrap()
		.add_protocol("rust-websocket")
		.connect_insecure()
		.unwrap();

	println!("Successfully connected");

	let (mut receiver, mut sender) = client.split().unwrap();

	let (tx, rx) = channel();

	let tx_1 = tx.clone();

	let send_loop = thread::spawn(move || {
		loop {
			// Send loop
			let message = match rx.recv() {
				Ok(m) => m,
				Err(e) => {
					println!("Send Loop: {:?}", e);
					return;
				}
			};
			match message {
				OwnedMessage::Close(_) => {
					let _ = sender.send_message(&message);
					// If it's a close message, just send it and then return.
					return;
				}
				_ => (),
			}
			// Send the message
			match sender.send_message(&message) {
				Ok(()) => (),
				Err(e) => {
					println!("Send Loop: {:?}", e);
					let _ = sender.send_message(&Message::close());
					return;
				}
			}
		}
	});

	let receive_loop = thread::spawn(move || {
		// Receive loop
		for message in receiver.incoming_messages() {
			let message = match message {
				Ok(m) => m,
				Err(e) => {
					println!("Receive Loop: {:?}", e);
					let _ = tx_1.send(OwnedMessage::Close(None));
					return;
				}
			};
			match message {
				OwnedMessage::Close(_) => {
					// Got a close message, so send a close message and return
					let _ = tx_1.send(OwnedMessage::Close(None));
					return;
				}
				OwnedMessage::Ping(data) => {
					match tx_1.send(OwnedMessage::Pong(data)) {
						// Send a pong in response
						Ok(()) => (),
						Err(e) => {
							println!("Receive Loop: {:?}", e);
							return;
						}
					}
				}
                OwnedMessage::Text(string) =>  {
                    let command: Command = serde_json::from_str(&string).expect("Could not parse command.");
                    
                    println!("Received command {} from {}", command.name, command.from);
                }
				// Say what we received
				_ => println!("Receive message: {:?}", message),
			}
		}
	});


	// We're exiting
	println!("Waiting for child threads to exit");

	let _ = send_loop.join();
	let _ = receive_loop.join();

	println!("Exited");
}

