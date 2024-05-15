
async function GetMusclesOption(option)
{
    const MusclesOption = {
        method: 'GET',
        url: 'https://work-out-api1.p.rapidapi.com/search',
        params: {Muscles: option},
        headers: {
            'X-RapidAPI-Key': process.env.XRapidAPIKey,
            'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
        }
    }

    return MusclesOption
}

async function GetEquipmentOption(option)
{
    const EquipmentOption = {
        method: 'GET',
        url: 'https://work-out-api1.p.rapidapi.com/search',
        params: {Equipment: option},
        headers: {
            'X-RapidAPI-Key': process.env.XRapidAPIKey,
            'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
        }
    }

    return EquipmentOption
}

async function GetIntensityOption(option)
{
    const IntensityOption = {
        method: 'GET',
        url: 'https://work-out-api1.p.rapidapi.com/search',
        params: {Intensity_Level: option},
        headers: {
            'X-RapidAPI-Key': process.env.XRapidAPIKey,
            'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
        }
    }

    return IntensityOption
}

module.exports = {GetMusclesOption, GetEquipmentOption, GetIntensityOption}