export const generateWhatsAppPayload = (formData: any) => {
    const divider = "──────────────────";
    
    const lines = [
        `*🛎️ CHECK-IN DIGITAL | ALPHA PLAZA*`,
        `_${divider}_`,
        ``,
        `*👤 DADOS DO HÓSPEDE*`,
        `*NOME:* ${formData.fullName.toUpperCase()}`,
    ];

    if (formData.isForeigner) {
        lines.push(`*ORIGEM:* 🌎 ${formData.passportCountry.toUpperCase()}`);
        lines.push(`*PASSAPORTE:* 🎫 ${formData.passportId}`);
    } else {
        lines.push(`*CPF:* 🪪 ${formData.cpf}`);
        lines.push(`*NASCIMENTO:* 📅 ${formData.birthDate}`);
    }

    lines.push(``);
    lines.push(`*📍 ENDEREÇO E CONTATO*`);
    lines.push(`*ENDEREÇO:* ${formData.address.toUpperCase()}, ${formData.number}`);
    lines.push(`*LOCALIZAÇÃO:* ${formData.city}/${formData.state} | ${formData.zipCode}`);
    lines.push(`*TELEFONE:* 📱 ${formData.phone || 'N/A'}`);
    lines.push(`*E-MAIL:* 📧 ${formData.email.toLowerCase()}`);

    lines.push(``);
    lines.push(`*🚗 VEÍCULO E LOGÍSTICA*`);
    if (formData.hasVehicle) {
        lines.push(`*MODELO:* ${formData.vehicleModel.toUpperCase()}`);
        lines.push(`*PLACA:* 🆔 ${formData.vehiclePlate.toUpperCase()} (${formData.vehicleColor.toUpperCase()})`);
        if (formData.vehicleExitTime) {
            lines.push(`*SAÍDA:* 🕒 ${formData.vehicleExitTime}`);
        }
    } else {
        lines.push(`*VEÍCULO:* ❌ NÃO POSSUI`);
    }

    if (formData.roomNumber) {
        lines.push(``);
        lines.push(`*🗝️ UNIDADE:* QUARTO ${formData.roomNumber}`);
    }

    lines.push(``);
    lines.push(`_${divider}_`);
    lines.push(`*✅ CHECK-IN RECEBIDO PELA RECEPÇÃO*`);
    lines.push(`*AGUARDE A CONFIRMAÇÃO DO ATENDENTE*`);

    return lines.join('\n');
};