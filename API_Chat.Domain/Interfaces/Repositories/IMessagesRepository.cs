using System.Collections.Generic;

namespace Chat.Domain
{
    public interface IMessagesRepository
    {
        List<MessageEntity> GetMessages();
        bool Add(MessageEntity message);
        bool Delete(MessageEntity message);
    }
}