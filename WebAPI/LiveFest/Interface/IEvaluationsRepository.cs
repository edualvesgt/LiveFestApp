using LiveFest.Domains;

namespace LiveFest.Interface
{
    public interface IEvaluationsRepository
    {
        public void Register(Evaluation evaluation);

        public Evaluation GetById(Guid id);

        public List<Evaluation> GetByEvent(Guid EventsID);
    }
}
