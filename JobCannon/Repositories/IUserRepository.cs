using System.Collections.Generic;
using JobCannon.Models;

namespace JobCannon.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAllCandidates();
        List<User> GetAllEmployers();
        List<User> GetAllUsers();
        User GetByFirebaseUserId(string firebaseUserId);
        User GetUserById(int id);
        void Add(User user);
        void Update(User user);
        void Delete(int id);
        User GetEmployerIdByUserId(int id);
        User GetUserByEmployerId(int id);
    }
}
