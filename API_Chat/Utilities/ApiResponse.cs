namespace Chat.Utilities
{
    public class ApiResponse<T>
    {
        public string StatusCode { get; set; }

        public string Errors { get; set; }

        public T Response { get; set; }
    }
}
