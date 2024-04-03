import {InitialState} from "@/typings";

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 */
export default function access(initialState: InitialState | undefined) {
  const { loginUser } = initialState ?? {};

  return {
    // 如果 loginUser 存在，则表示用户已登录
    canUser: loginUser,
    // 如果 loginUser 存在，并且用户角色为 'admin'，则表示该用户是管理员
    canAdmin: loginUser?.userRole === 'admin',
  };
}
