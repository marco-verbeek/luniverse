import { UserProfileDTO } from './user-profile.dto';

export const fetchUserByPuuid = async (
  puuid: string,
): Promise<UserProfileDTO> => {
  const userReq = await fetch(`http://auth:3001/auth/users?puuid=${puuid}`);

  // User could not be found.
  if (userReq.status !== 200) {
    return null;
  }

  const user = await userReq.json();
  return user as UserProfileDTO;
};
