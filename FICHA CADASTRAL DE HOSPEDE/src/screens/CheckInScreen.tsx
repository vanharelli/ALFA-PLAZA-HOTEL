import React, { useState, useRef } from 'react';
import { User, MapPin, Car } from 'lucide-react';
import { IMaskInput } from 'react-imask';
import { DEFAULT_HOTEL } from '../data/hotel_config';
import { fetchAddress } from '../logic/api/viacep';
import { generateWhatsAppPayload } from '../logic/generators/vcard';
import { LegalShield, LegalFooter, PrivacyLink } from '../components/security/LegalModal';

export const CheckInScreen: React.FC = () => {
    const numberInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        fullName: '',
        isForeigner: false,
        passportCountry: '',
        passportId: '',
        cpf: '',
        birthDate: '',
        address: '',
        number: '',
        zipCode: '',
        city: '',
        state: '',
        email: '',
        phone: '',
        roomNumber: '',
        hasVehicle: false,
        vehicleModel: '',
        vehicleColor: '',
        vehiclePlate: '',
        vehicleExitTime: '',
    });

    const [isLegalChecked, setIsLegalChecked] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Zero-latency Address Fetch
        if (name === 'zipCode') {
            const cleanZip = value.replace(/\D/g, '');
            if (cleanZip.length === 8) {
                handleFetchAddress(cleanZip);
            }
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFetchAddress = async (cep: string) => {
        const address = await fetchAddress(cep);

        if (address) {
            setFormData(prev => ({
                ...prev,
                address: address.logradouro,
                city: address.localidade,
                state: address.uf
            }));
            numberInputRef.current?.focus();
        }
    };

    const handleSubmit = () => {
        if (!isLegalChecked) {
            alert('Por favor, aceite os termos legais para continuar.');
            return;
        }

        // 1. Generate WhatsApp Link
        const payload = generateWhatsAppPayload(formData);
        const whatsappUrl = `https://wa.me/${DEFAULT_HOTEL.whatsapp}?text=${encodeURIComponent(payload)}`;

        // 2. Open WhatsApp
        window.location.href = whatsappUrl;

        // 3. Wipe Data (Stateless)
        setFormData({
            fullName: '',
            isForeigner: false,
            passportCountry: '',
            passportId: '',
            cpf: '',
            birthDate: '',
            address: '',
            number: '',
            zipCode: '',
            city: '',
            state: '',
            email: '',
            phone: '',
            roomNumber: '',
            hasVehicle: false,
            vehicleModel: '',
            vehicleColor: '',
            vehiclePlate: '',
            vehicleExitTime: '',
        });
        setIsLegalChecked(false);
    };

    const inputClasses = "w-full p-3 bg-transparent border border-gold-500/70 rounded-lg text-gold-400 placeholder-gold-600/40 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 outline-none transition-all uppercase backdrop-blur-xl hover:bg-black/60 font-medium tracking-wide shadow-inner";
    const labelClasses = "block text-xs font-bold text-white uppercase mb-1 tracking-wider";

    return (
        <div 
            className="min-h-screen flex flex-col items-center py-10 px-4 bg-cover bg-center bg-fixed bg-no-repeat"
            style={{
                backgroundImage: `url(${DEFAULT_HOTEL.background})`,
                backgroundColor: '#000' // Fallback
            }}
        >
            {/* Overlay Gradient for Readability */}
            <div className="absolute inset-0 bg-black/90 z-0 pointer-events-none" />
            
            {/* Header */}
            <div className="text-center mb-8 relative z-10 flex flex-col items-center">
                <img 
                    src={DEFAULT_HOTEL.logo} 
                    alt="Logo Hotel" 
                    className="h-24 mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 duration-300"
                />
                <h1 className="text-3xl font-bold text-gold-500 uppercase tracking-[0.2em] mb-2 drop-shadow-2xl">
                    CHECK-IN DIGITAL
                </h1>
                <p className="text-gold-600/80 font-medium tracking-wide text-sm drop-shadow-lg">ALFA PLAZA HOTEL</p>
            </div>

            {/* Glassmorphism Card */}
            <div className="w-full max-w-2xl rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] p-8 border border-gold-500/70 backdrop-blur-3xl bg-black/98 relative z-10">
                
                {/* Personal Info */}
                <div className="space-y-6 mb-8">
                    <div className="flex items-center justify-between border-b border-gold-500/70 pb-3">
                        <h2 className="flex items-center gap-3 text-lg font-bold text-white">
                            <User className="text-gold-400" size={20} />
                            Dados Pessoais
                        </h2>
                    </div>

                    <div>
                        <label className={labelClasses}>Nome Completo</label>
                        <input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="DIGITE SEU NOME"
                            className={inputClasses}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClasses}>É Estrangeiro?</label>
                            <select
                                name="isForeigner"
                                value={formData.isForeigner ? 'yes' : 'no'}
                                onChange={(e) => setFormData(prev => ({ ...prev, isForeigner: e.target.value === 'yes' }))}
                                className={inputClasses}
                            >
                                <option value="no" className="bg-gray-900 text-white">NÃO</option>
                                <option value="yes" className="bg-gray-900 text-white">SIM</option>
                            </select>
                        </div>
                        {formData.isForeigner ? (
                             <div>
                                <label className={labelClasses}>País de Origem</label>
                                <input
                                    name="passportCountry"
                                    value={formData.passportCountry}
                                    onChange={handleChange}
                                    placeholder="PAÍS"
                                    className={inputClasses}
                                />
                            </div>
                        ) : (
                            <div>
                                <label className={labelClasses}>CPF</label>
                                <IMaskInput
                                    mask="000.000.000-00"
                                    name="cpf"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    placeholder="000.000.000-00"
                                    className={inputClasses}
                                />
                            </div>
                        )}
                    </div>
                     {formData.isForeigner ? (
                        <div>
                            <label className={labelClasses}>Passaporte / ID</label>
                            <input
                                name="passportId"
                                value={formData.passportId}
                                onChange={handleChange}
                                placeholder="NÚMERO DO DOCUMENTO"
                                className={inputClasses}
                            />
                        </div>
                    ) : (
                        <div>
                            <label className={labelClasses}>Data de Nascimento</label>
                            <IMaskInput
                                mask="00/00/0000"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                placeholder="DD/MM/AAAA"
                                className={inputClasses}
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClasses}>Telefone / WhatsApp</label>
                            <IMaskInput
                                mask="(00) 00000-0000"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="(00) 00000-0000"
                                className={inputClasses}
                            />
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-6 mb-8">
                    <div className="flex items-center justify-between border-b border-gold-500/70 pb-3">
                        <h2 className="flex items-center gap-3 text-lg font-bold text-white">
                            <MapPin className="text-gold-400" size={20} />
                            Endereço
                        </h2>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <label className={labelClasses}>CEP</label>
                            <IMaskInput
                                mask="00000-000"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                placeholder="00000-000"
                                className={inputClasses}
                            />
                        </div>
                         <div className="col-span-2">
                            <label className={labelClasses}>Cidade</label>
                            <input
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="CIDADE"
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-3">
                            <label className={labelClasses}>Endereço</label>
                            <input
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="RUA, AV..."
                                className={inputClasses}
                            />
                        </div>
                        <div className="col-span-1">
                            <label className={labelClasses}>Nº</label>
                            <input
                                ref={numberInputRef}
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                placeholder="123"
                                className={inputClasses}
                            />
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClasses}>Estado</label>
                            <input
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="UF"
                                className={inputClasses}
                            />
                        </div>
                         <div>
                            <label className={labelClasses}>Nº Quarto (Opcional)</label>
                            <input
                                name="roomNumber"
                                value={formData.roomNumber}
                                onChange={handleChange}
                                placeholder="101"
                                className={inputClasses}
                            />
                        </div>
                    </div>
                     <div>
                        <label className={labelClasses}>E-mail</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="seu@email.com"
                            className={inputClasses}
                        />
                    </div>
                </div>

                {/* Vehicle */}
                <div className="space-y-6 mb-8">
                    <div className="flex items-center justify-between border-b border-gold-500/70 pb-3">
                        <h2 className="flex items-center gap-3 text-lg font-bold text-white">
                            <Car className="text-gold-400" size={20} />
                            VAI USAR A GARAGEM?
                        </h2>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setFormData(prev => ({ ...prev, hasVehicle: true }))}
                                className={`px-6 py-2 rounded-lg text-sm font-bold uppercase transition-all border tracking-wider ${
                                    formData.hasVehicle 
                                    ? 'bg-gold-500 text-black border-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                                    : 'bg-transparent text-gold-600 border-gold-600/30 hover:bg-gold-600/10'
                                }`}
                            >
                                SIM
                            </button>
                            <button
                                onClick={() => setFormData(prev => ({ ...prev, hasVehicle: false }))}
                                className={`px-6 py-2 rounded-lg text-sm font-bold uppercase transition-all border tracking-wider ${
                                    !formData.hasVehicle 
                                    ? 'bg-gold-500 text-black border-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                                    : 'bg-transparent text-gold-600 border-gold-600/30 hover:bg-gold-600/10'
                                }`}
                            >
                                NÃO
                            </button>
                        </div>
                    </div>

                    {formData.hasVehicle && (
                        <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                            <div>
                                <label className={labelClasses}>Modelo</label>
                                <input
                                    name="vehicleModel"
                                    value={formData.vehicleModel}
                                    onChange={handleChange}
                                    placeholder="MODELO"
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Cor</label>
                                <input
                                    name="vehicleColor"
                                    value={formData.vehicleColor}
                                    onChange={handleChange}
                                    placeholder="COR"
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Placa</label>
                                <input
                                    name="vehiclePlate"
                                    value={formData.vehiclePlate}
                                    onChange={handleChange}
                                    placeholder="ABC-1234"
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Saída Prevista</label>
                                <IMaskInput
                                    mask="00:00"
                                    name="vehicleExitTime"
                                    value={formData.vehicleExitTime}
                                    onChange={handleChange}
                                    placeholder="00:00"
                                    className={inputClasses}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gold-600/10">
                    <LegalShield 
                        isChecked={isLegalChecked}
                        onChange={() => setIsLegalChecked(!isLegalChecked)}
                        themeColor="gold"
                    />
                    
                    <PrivacyLink />

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={!isLegalChecked}
                        className={`w-full mt-6 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all transform 
                            ${isLegalChecked 
                                ? 'bg-gold-600 hover:bg-gold-500 text-black shadow-lg hover:shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer' 
                                : 'bg-gray-800/50 text-gray-500 cursor-not-allowed opacity-70 border border-white/5'
                            }`}
                    >
                        Realizar Check-in
                    </button>

                    <div className="mt-4">
                        <LegalFooter themeColor="gold" />
                    </div>
                </div>
            </div>
        </div>
    );
};
