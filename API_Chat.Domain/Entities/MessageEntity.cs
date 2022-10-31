namespace Chat.Domain
{
    public class MessageEntity
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string FirstNameAuthor { get; set; }
        public string LastNameAuthor { get; set; }
        public string FirstNameRecipient { get; set; }
        public string LastNameRecipient { get; set; }
        public string RecipientEmail { get; set; }
    }
}
