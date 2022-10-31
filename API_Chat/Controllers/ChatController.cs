using API_Chat.Hubs;
using Chat.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Chat.Controllers
{
    [ApiController]
    [Route("chat")]
    public class ChatController : ControllerBase
    {
        private readonly IMessagesRepository _messagesRepository;
        private readonly IEmailService _emailService;
        private readonly IHubContext<ChatHub, IChatHub> _messageHub;

        public ChatController(IMessagesRepository messagesRepository, IEmailService emailService, IHubContext<ChatHub, IChatHub> messageHub)
        {
            _messagesRepository = messagesRepository;
            _emailService = emailService;
            _messageHub = messageHub;
        }

        [HttpGet]
        [Authorize("Administrator")]
        [Route("getSomeSecretData")]
        public IActionResult GetSomeSecretData()
        {
            return Ok("SomeSecretKey");
        }

        [HttpPost]
        [Route("getMessages")]
        public IActionResult GetMessages(ConversationDto conversation)
        {
            var messages = _messagesRepository.GetMessages()
                .Where(message =>
                ((message.FirstNameAuthor == conversation.FirstNameAuthor) && (message.LastNameAuthor == conversation.LastNameAuthor) && (message.FirstNameRecipient == conversation.FirstNameRecipient) && (message.LastNameRecipient == conversation.LastNameRecipient)) ||
                ((message.FirstNameAuthor == conversation.FirstNameRecipient) && (message.LastNameAuthor == conversation.LastNameRecipient) && (message.FirstNameRecipient == conversation.FirstNameAuthor) && (message.LastNameRecipient == conversation.LastNameAuthor))
                );

            var messagesDto = messages.Select(user => new MessageDto
            {
                Content = user.Content,
                Author = user.FirstNameAuthor + " " + user.LastNameAuthor,
                Recipient = user.FirstNameRecipient + " " + user.LastNameRecipient
            });

            return Ok(messagesDto);
        }

        [HttpPost]
        [Route("sendMessage")]
        public IActionResult SendMessage([FromBody] MessageDto messageDto)
        {
            var messageEntity = new MessageEntity()
            {
                Content = messageDto.Content,
                FirstNameAuthor = messageDto.Author.Split(" ").First(),
                LastNameAuthor = messageDto.Author.Split(" ").Skip(1).First(),
                FirstNameRecipient = messageDto.Recipient.Split(" ").First(),
                LastNameRecipient = messageDto.Recipient.Split(" ").Skip(1).First(),
                RecipientEmail = messageDto.RecipientEmail
            };
            if (messageDto.EmailSending == 1) {
                if (messageDto.RecipientEmail != null)
                {
                    _emailService.SendMessageEmail(messageDto.RecipientEmail, messageDto.Content);
                }
            }
            var result = _messagesRepository.Add(messageEntity);
            if (result)
            {
                _messageHub.Clients.All.SendMessage().Wait();
                return Ok(messageDto);
            }

            return NotFound();
        }
    }
}
