using System.Collections.Generic;
using JobCannon.Models;

namespace JobCannon.Repositories
{
    public interface IEmployerRepository
    {
        Employer GetEmployerById(int id);
        void Add(Employer employer);
        void Delete(int id);
        void Update(Employer employer);
    }
}
