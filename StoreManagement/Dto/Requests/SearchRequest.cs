namespace StoreManagement.Dto.Requests
{
    public class SearchRequest
    {
        public string Keyword { get; set; } = string.Empty;
        public int Page { get; set; } = 1;
        public int Size { get; set; } = 10;
    }

}
