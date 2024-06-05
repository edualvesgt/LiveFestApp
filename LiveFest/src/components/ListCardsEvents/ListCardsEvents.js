import { FlatList } from "react-native"

export const ListCardsEvents = ({
  dataCardsEvents
}) => {
  return (
    <>
      <FlatList
        data={dataCardsEvents}
        renderItem={({ item }) =>

          select == item.situacao.situacao && (
            <CardEvents
              setSituacao={item.situacao.situacao}
              data={item}
              role={profile.role}
              navigation={navigation}
              selectStatus={select}
              setShowModalCancel={setShowModalCancel}
              setShowModalMedicalRecord={setShowModalMedicalRecord}
              setShowModalShowLocalConsult={setShowModalShowLocalConsult}
              setConsultSelect={setConsultSelect}
              setSelect={setSelect}
              setDadosCard={setDadosCard}

            />)

        }
        keyExtractor={item => item.id}
        style={{
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          if (role == 'Medico' && select == 'Agendadas') {
            return <Text>Não há nenhum atendimento para o dia. </Text>
          }
          if (role == 'Medico' && select == 'Realizadas') {
            return <Text>Não há nenhum consulta realizada.</Text>
          }
          if (select == 'Canceladas') {
            return <Text>Nenhum consulta foi cancelada.</Text>
          }

          if (role == 'Paciente' && select == 'Agendadas') {
            return <Text>Não há nenhuma consulta agendada, caso queria realizar uma consulta, clique no botão verde no canto inferiror direito da tela. </Text>
          }
          if (role == 'Paciente' && select == 'Realizadas') {
            return <Text>Nenhum consulta foi realizada.</Text>
          }


        }}
      />
    </>
  )
}