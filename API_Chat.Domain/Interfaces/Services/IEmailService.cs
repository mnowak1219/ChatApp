namespace Chat.Domain
{
    public interface IEmailService
    {
        void SendMessageEmail(string email, string message);
    }
}
