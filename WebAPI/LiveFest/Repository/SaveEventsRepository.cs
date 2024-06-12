using LiveFest.Context;
using LiveFest.Domains;
using LiveFest.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace LiveFest.Repository
{
    public class SaveEventsRepository : ISaveEventsRepository
    {
        public LiveFestContext ctx = new LiveFestContext();

        public void DeleteSaveEvent(Guid userID, Guid eventID)
        {
            try
            {
                // Assumindo que existe uma entidade SaveEvent que representa a relação entre usuário e evento salvo
                var saveEvent = ctx.SaveEvents
                    .FirstOrDefault(se => se.UserID == userID && se.EventsID == eventID);

                if (saveEvent != null)
                {
                    ctx.SaveEvents.Remove(saveEvent);
                    ctx.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                // Log a exceção, se necessário
                // throw a exceção ou retornar um resultado indicando falha
                throw new InvalidOperationException("Erro ao deletar evento salvo.", ex);
            }
        }

        public List<SaveEvents> GetAll()
        {
            return ctx.SaveEvents.ToList();
        }

        public bool SaveEvent(Guid userID, Guid eventID)
        {
            try
            {
                // Check if the event already exists for the user
                var existingEvent = ctx.SaveEvents.FirstOrDefault(se => se.UserID == userID && se.EventsID == eventID);

                if (existingEvent == null)
                {
                    // Create a new SaveEvents object
                    var saveEvent = new SaveEvents
                    {
                        UserID = userID,
                        EventsID = eventID
                    };

                    ctx.SaveEvents.Add(saveEvent);
                    ctx.SaveChanges();
                    return true;
                }
                else
                {
                    // Event already saved for the user
                    return false;
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions during saving
                Console.WriteLine($"Error saving event: {ex.Message}");
                return false;
            }
        }
    }
}
