using System.Collections.Generic;
using JobCannon.Models;

namespace JobCannon.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAllUsers();
    }
}
