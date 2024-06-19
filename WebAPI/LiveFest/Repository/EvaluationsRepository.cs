using LiveFest.Context;
using LiveFest.Domains;
using LiveFest.Interface;

namespace LiveFest.Repository
{
    public class EvaluationsRepository : IEvaluationsRepository
    {
        public LiveFestContext ctx = new LiveFestContext();

        public List<Evaluation> GetByEvent(Guid EventsID)
        {
            try
            {
                List<Evaluation> eventList = ctx.Evaluation
                    .Where(x => x.EventsID == EventsID)
                    .ToList();

                return eventList;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Evaluation GetById(Guid id)
        {
            try
            {
                return ctx.Evaluation.FirstOrDefault(x => x.ID == id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Register(Evaluation evaluation)
        {
            ctx.Evaluation.Add(evaluation);
            ctx.SaveChanges();
        }
    }
}
