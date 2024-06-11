
using LiveFest.Context;
using LiveFest.Utils.Email;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Adicionar serviços ao contêiner.
// Configura a conexão com o banco de dados.
builder.Services.AddDbContext<LiveFestContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlDataBase"));
});

builder.Services.AddControllers();

// Configurar o Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "API LiveFest",
        Description = "Backend API",
        Contact = new OpenApiContact
        {
            Name = "LiveFestApp"
        }
    });
});

// Configurar EmailSettings
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection(nameof(EmailSettings)));

// Registrar o serviço de envio de e-mails
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddScoped<EmailSendingService>();

////Adiciona serviço Jwt Bearer (forma de autenticação)
////Deixar indentado assim:
//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultChallengeScheme = "JwtBearer";
//    options.DefaultAuthenticateScheme = "JwtBearer";
//})
////Deixar indentado assim:
//.AddJwtBearer("JwtBearer", options =>
//{
//    options.TokenValidationParameters = new TokenValidationParameters
//    {
//        //Valida quem esta solicitando
//        ValidateIssuer = true,
//        //Valida quem esta recebendo
//        ValidateAudience = true,
//        //Define se o tempo de expiração será validado
//        ValidateLifetime = true,
//        //Forma de criptografia que valida a chave de autentificação
//        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("chave-autenticacao-webapi-eventos-livefest")),
//        //Valida o tempo de expiração do token ClockSkew = TimeSpan.FromMinutes(5),
//        //Nome do issuer (de onde esta vindo) ValidIssuer = "webapi.Filmes",
//        //Nome do issuer (para onde esta indo) ValidAudience = "webapi.Filmes"
//    };
//});

var app = builder.Build();

// Configurar o pipeline de solicitação HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
