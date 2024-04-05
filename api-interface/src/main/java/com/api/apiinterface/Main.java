package com.api.apiinterface;

import com.api.apiinterface.client.ApiClient;
import com.api.apiinterface.modal.User;

public class Main {
    public static void main(String[] args) {
        // 创建 YuApiClient 实例
        ApiClient apiClient = new ApiClient();

        // 使用 getNameByGet 方法从服务器获取名称信息，并传入参数 "鱼皮"
        String result1 = apiClient.getNameByGet("鱼皮");

        // 使用 getNameByPost 方法从服务器获取名称信息，并传入参数 "鱼皮"
        String result2 = apiClient.getNameByPost("鱼皮");

        // 创建 User 对象，并设置用户名为 "鲤鱼旗"
        User user = new User();
        user.setUsername("鲤鱼旗");

        // 使用 getUserNameByPost 方法向服务器发送 User 对象，并获取服务器返回的结果
        String result3 = apiClient.getUserNameByPost(user);

        // 打印三个方法的结果
        System.out.println(result1);
        System.out.println(result2);
        System.out.println(result3);
    }
}
