using Chat.Domain;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Chat.Services
{
    public class EmailService : IEmailService
    {
        private readonly string _apiKey;

        public EmailService(IConfiguration configuration)
        {
            _apiKey = configuration["Application:APIKeyForSendGrid"];
        }

        public void SendMessageEmail(string email, string message)
        {
            var client = new SendGridClient(_apiKey);
            var from = new EmailAddress("chat.app@interia.pl", "Chat App");
            var subject = "Nowa wiadomość w aplikacji czatu!";
            var to = new EmailAddress(email);
            var plainTextContent = $"Otrzymałeś nową wiadomość: {message}. Szczegóły wiadomości zobaczysz po zalogowaniu się na stronie o adresie localhost:5001/chat";
            var htmlContent = $"<strong>Otrzymałeś nową wiadomość:<br />{message}</strong> <br /><br />Szczegóły wiadomości zobaczysz po zalogowaniu się na stronie internetowej chatu. <a href=”https://localhost:5001/”> KLIKNIJ TUTAJ</a> aby przejść do aplikacji.<br />Jeśli klient poczty nie wyświetla wiadomości poprawnie odwiedź adres https://localhost:5001/";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = client.SendEmailAsync(msg).Result;
            if (!response.IsSuccessStatusCode)
            {
                throw new System.Exception("Something went wrong");
            }
        }
    }
}
