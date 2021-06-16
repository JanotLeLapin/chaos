import { Router } from 'express';
export const router = Router();

import { targets } from '../../index';

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
