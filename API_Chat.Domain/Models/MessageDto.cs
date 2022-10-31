namespace Chat.Domain
{
    public class MessageDto
    {
        public string Content { get; set; }
        public string Author { get; set; }
        public string Recipient { get; set; }
        public string RecipientEmail { get; set; }
        public int EmailSending { get; set; }
    }
}
