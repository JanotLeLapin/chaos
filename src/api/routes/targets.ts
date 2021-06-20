import { Router } from 'express';
export const router = Router();

import { IpregistryClient } from '@ipregistry/client';

import { targets } from '../../index';

const ipr = new IpregistryClient(process.env.IPREGISTRY_KEY);

router.get('/', (_req, res) => {
  res.status(200).json(
    targets.map((target) => {
      return {
        ...target.toJSON(),
        os: undefined,
        up: undefined,
      };
    })
  );
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const target = targets.find((t) => t.id === id);
  if (!target) return res.status(404).json({ message: 'Target not found.' });

  return res.status(200).json(target.toJSON());
});

router.get('/:id/locate', async (req, res) => {
  const id = req.params.id;

  const target = targets.find((t) => t.id === id);
  if (!target) return res.status(404).json({ message: 'Target not found.' });

  if (target.location.latitude && target.location.longitude)
    return res.status(200).json(target.location);

  try {
    const { data } = await ipr.lookup(target.ip);
    const { latitude, longitude } = data.location;
    target.location = { latitude, longitude };
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Could not locate target.' });
  }

  return res.status(200).json(target.location);
});
