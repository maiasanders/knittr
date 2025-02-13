package com.knittr.api.dao;

import com.knittr.api.model.User;

public interface UserDao {
//    TODO create jdbc class
    User getUserById(int id);
    User getUserByName(String name);
    User createUser(User user);
}
