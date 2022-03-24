import type { ActionFunction } from "remix";

import { requireUserId } from "~/util/session.server";

export const action: ActionFunction = async ({ request }) => {
  await requireUserId(request);
};
