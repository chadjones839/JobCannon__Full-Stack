using System.Collections.Generic;
using JobCannon.Models;

namespace JobCannon.Repositories
{
    public interface IJobRepository
    {
        List<Job> GetAllJobs();
        Job GetJobById(int id);
        void Add(Job job);
        void Update(Job job);
        void Delete(int id);
        List<Job> GetAllJobsByEmployerId(int id);
    }
}
