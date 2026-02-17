export const generateWhatsAppPayload = (formData: any) => {
    const divider = "──────────────────";
    
    const lines = [
        `*🛎️ CHECK-IN DIGITAL | ALFA PLAZA HOTEL*`,
        `_${divider}_`,
        ``,
        `*👤 DADOS DO HÓSPEDE*`,
        `👤 ${formData.fullName.toUpperCase()}`,
    ];

    if (formData.isForeigner) {
        lines.push(`🌎 ${formData.passportCountry.toUpperCase()}`);
        lines.push(`🎫 ${formData.passportId}`);
    } else {
        lines.push(`🪪 ${formData.cpf}`);
        lines.push(`📅 ${formData.birthDate}`);
    }

    lines.push(``);
    lines.push(`*📍 ENDEREÇO E CONTATO*`);
    lines.push(`🏠 ${formData.address.toUpperCase()}, ${formData.number}`);
    lines.push(`📍 ${formData.city}/${formData.state} | ${formData.zipCode}`);
    lines.push(`📱 ${formData.phone || 'N/A'}`);
    lines.push(`📧 ${formData.email.toLowerCase()}`);

    lines.push(``);
    lines.push(`*🚗 VEÍCULO E LOGÍSTICA*`);
    if (formData.hasVehicle) {
        lines.push(`🚘 ${formData.vehicleModel.toUpperCase()}`);
        lines.push(`🆔 ${formData.vehiclePlate.toUpperCase()} (${formData.vehicleColor.toUpperCase()})`);
        if (formData.vehicleExitTime) {
            lines.push(`🕒 ${formData.vehicleExitTime}`);
        }
    } else {
        lines.push(`❌ NÃO POSSUI VEÍCULO`);
    }

    if (formData.roomNumber) {
        lines.push(``);
        lines.push(`*🗝️ UNIDADE:* QUARTO ${formData.roomNumber}`);
    }

    lines.push(``);
    lines.push(`_${divider}_`);
    lines.push(`*✅ CHECK-IN RECEBIDO PELA RECEPÇÃO*`);


    return lines.join('\n');
};