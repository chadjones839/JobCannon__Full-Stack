using System.Collections.Generic;
using JobCannon.Models;

namespace JobCannon.Repositories
{
    public interface ISchoolRepository
    {
        List<School> GetAllSchool();
        List<School> GetSchoolsByUserId(int id);
        School GetSchoolById(int id);
        void Add(School school);
        void Update(School school);
        void Delete(int id);
    }
}