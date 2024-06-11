using LiveFest.Domains;

namespace LiveFest.Interface
{
    public interface ISaveEventsRepository
    {

        //    public void Register(SaveEvents saveEvents);

        //    public SaveEvents GetById(Guid id);

<<<<<<< HEAD
        public List<SaveEvents> ListAll();
=======
        public List<SaveEvents> GetAll();

        bool SaveEvent(Guid userID, Guid eventID);
>>>>>>> 7aac4ca1cafccac4d87abe2b73c027bd0556ea72
    }
}
