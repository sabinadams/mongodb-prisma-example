import { ActionFunction, json, redirect } from "remix";
import { requireUserId } from "~/util/session.server";
import { uploadAvatar } from "~/util/s3.server";
import { prisma } from "~/util/db.server";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const imageUrl = await uploadAvatar(request);

  // Profile is optional so we have to use upsert to update it in case it wasn't there
  await prisma.user.update({
    data: {
      profile: {
        update: {
          profilePicture: imageUrl,
        },
      },
    },
    where: {
      id: userId,
    },
  });

  return json({ imageUrl });
};
