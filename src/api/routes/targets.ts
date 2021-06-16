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

});
