using LiveFest.Context;
using LiveFest.Utils.Email;
using Microsoft.EntityFrameworkCore;
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

var app = builder.Build();

// Configurar o pipeline de solicitação HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
