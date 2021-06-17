# Clinica Online

Proyecto para administrar una clinica con sus turnos, medicos, clientes y administradores
###### 
⚡ Accede al proyecto desde el siguiente [link](https://clinicaonlinelabo4.herokuapp.com/). ⚡
## Requerimientos

La clínica OnLine, especialista en salud, cuenta actualmente con consultorios (6 en la actualidad),
dos laboratorios (físicos en la clínica), y una sala de espera general. Está abierta al público de lunes a
viernes en el horario de 8:00 a 19:00, y los sábados en el horario de 8:00 a 14:00.
Trabajan en ella profesionales de diversas especialidades, que ocupan los consultorios acorde a su
disponibilidad, y reciben en ellos pacientes con turno para consulta o tratamiento. Dichos turnos son
pedidos por la web seleccionando el profesional o la especialidad. La duración mínima de un turno es
30 minutos
Registrar

## Utilizacion de la app
#### Acciones del paciente:
##### Solicitar turno:
Se accede a la seccion Solicitar Turno donde se elije el medico, fecha y horario en la que se desea dar de alta el turno
![sacar turno gif](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2Fezgif.com-gif-maker.gif?alt=media&token=9f96d915-d21b-40d8-afa5-7a1e7320c50f)

Filtro de medicos:

![sacar turno gif](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2Ffiltromedico.gif?alt=media&token=148e65ab-8a68-417e-845d-2efbd3422025)

##### Cancelar turno:
##

![sacar turno gif](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2FcancelarTurnoPaciente.gif?alt=media&token=618949cc-930a-492e-a8fe-81b130cae271)

##### Calificar atencion:
El paciente deja un comentario de como fue la atención del Especialista una vez el turno sea realizado.
![calificar atencion](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2Fcalificar%20atencion.png?alt=media&token=8cc9ebb4-902d-4312-81cb-5c7c203adaac)

##### Filtrar busqueda:
Filtro de busqueda donde se realiza la busqueda por cualquier campo del turno
![filtro de busqueda](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2Ffiltro.png?alt=media&token=967bad41-0c16-41a1-9834-708aee842412)
##
#### Acciones del Medico:

##### Cancelar, rechazar, aceptar y finalizar turnos.
![acciones medico](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2Fmedico.png?alt=media&token=aa5f3d41-709f-4d81-ba65-54aa538b11ec)

#####  Agregar disponibilidad:
Segun la especialidad en la que se haya registrado el medico va a elegir el dia de la semana (semana actual), el horario de comienzo de atencion y la cantidad de turnos a realizar.
![disponibilidad medico](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2Fagregar%20turno.png?alt=media&token=2e9720fa-0b2a-494d-8c48-8ec74a9567d2)

##
#### Acciones del Administrador:
##### Seccion Administrar Usuarios
Como administrador en la seccion **Administrar usuarios** voy a poder habilitar al medico para acceder al sistema, darlo de baja por licencia (colocando algun comentario), dar de alta nuevos usuarios administradores y ver la historia clinica de todos los pacientes

![administrar usuarios](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2Fadmin%20user.png?alt=media&token=87bf7dee-725d-4514-8c3a-18503665d3be)

##### Seccion Mi Perfil
En la seccion **Mi Perfil** voy a poder exportar a excel una lista de todos los usuarios registrados en el sistema
![registrados en el sistema](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2Fmi%20perfil%20admin.png?alt=media&token=4e30aa92-2588-427f-be71-cc378988c779)

Ver y exportar pdf logs de ingresos al sistema
![exportar logs](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2Fexportar%20logs.png?alt=media&token=7e383826-f4f1-47c2-87f9-e20f32f0d856)
![exportar logs](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2Flogs%20pdf.png?alt=media&token=d3567b50-85ed-4ddb-9d59-8b927f8df302)

Ver y exportar a pdf grafico de barras de cantidad de turnos por dia
![exportar grafico](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2Fcant%20turno%20xdia.png?alt=media&token=d57b2aba-01c9-4a6c-80b3-eadd41257a87)
![exportar grafico](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2Fcant%20turno%20x%20dia.png?alt=media&token=f5eae5a3-5453-4816-8dba-af4efa884e2c)

Ver y exportar a pdf grafico de torta de cantidad de especialidades por turnos
![exportar grafico](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2Fcant%20esp%20turno.png?alt=media&token=84ef5a93-b914-4c38-bf89-d93132b57edc)
![exportar grafico](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2Fcant%20esp%20turno%20a.png?alt=media&token=3f8a8b49-0c62-440b-a6a4-6d09fb355e84)

Seleccionar una fecha para filtrar la cantidad de turnos solicitados por medico hasta el dia de hoy, poder ver el grafico y descargarlo a pdf
![exportar grafico](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2Fcant%20fecha1.png?alt=media&token=49661e51-3bcd-4b32-91f2-9bd86334fcbe)
![exportar grafico](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2Fcantfecha1.png?alt=media&token=dee0245e-198e-4c03-9490-f428c93e053e)

Seleccionar una fecha para filtrar la cantidad de turnos realizados por medico hasta el dia de hoy, poder ver el grafico y descargarlo a pdf
![exportar grafico](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2Fcant%20fecha%202.png?alt=media&token=df449e62-2fc7-43aa-baf8-ce101f9ffe45)
![exportar grafico](https://firebasestorage.googleapis.com/v0/b/clinicaonline-72cfa.appspot.com/o/gifReadme%2Fcant%20fecha%202%20a.png?alt=media&token=bc599a6e-35f5-41d2-a917-f9fae5d8e87c)