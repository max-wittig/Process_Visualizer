class ProcessJsonParser
{
    constructor(jsonString)
    {
        this.jsonString = jsonString;
    }

    get_json()
    {
        return JSON.parse(this.jsonString);
    }


}