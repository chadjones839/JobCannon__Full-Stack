using System.Collections.Generic;
using JobCannon.Models;

namespace JobCannon.Repositories
{
    public interface IMessageRepository
    {
        List<Message> GetAllMessages();
        List<Message> GetMessagesByChatId(int id);
        Message GetLastMessage(int chatId);
        void Add(Message message);
        void Update(Message message);
        void Delete(int id);
    }
}
