using System.Collections.Generic;
using JobCannon.Models;

namespace JobCannon.Repositories
{
    public interface IWorkHistoryRepository
    {
        List<WorkHistory> GetAllWorkHistory();
        List<WorkHistory> GetAllWorkHistoryByUserId(int id);
        WorkHistory GetWorkHistoryById(int id);
        void Add(WorkHistory workHistory);
        void Update(WorkHistory workHistory);
        void Delete(int id);
    }
}