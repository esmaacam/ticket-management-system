namespace TicketApi.Models
{
    public class Ticket
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; }

        public int AssignedTo { get; set; }

        public string Status { get; set; }
    }
}
