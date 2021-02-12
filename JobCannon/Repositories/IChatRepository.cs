using System.Collections.Generic;
using JobCannon.Models;

namespace JobCannon.Repositories
{
    public interface IChatRepository
    {
        List<Chat> GetAllChats();
        Chat GetChatById(int id);
        void Add(Chat chat);
        void Update(Chat chat);
        void Delete(int id);
    }
}
