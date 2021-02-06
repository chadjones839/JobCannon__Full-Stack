using System.Collections.Generic;
using JobCannon.Models;

namespace JobCannon.Repositories
{
    public interface ICandidateRepository
    {
        Candidate GetCandidateById(int id);
        void Add(Candidate candidate);
        void Update(Candidate candidate);
        void Delete(int id);
    }
}
