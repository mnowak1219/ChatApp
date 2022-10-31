using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API_Chat.Hubs
{
    public interface IChatHub
    {
        public Task SendMessage();
        public Task UserCreated();
    }
}
