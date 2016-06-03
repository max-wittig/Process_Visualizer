function showGantt()
{
    if(localStorage.length > 0)
    {
        let file = localStorage.getItem("file")
        if(file != null)
        {
            let json_parser = new ProcessJsonParser(file)
            let visualizer = new Visualizer(json_parser.get_json())
            visualizer.build_task_array()
            visualizer.show()
        }
    }
}

function processFile(e)
{

    var file = e.target.result,results
    localStorage.setItem("file", file)
    showGantt()
}

function remove_old_gantt()
{
    let svg = document.getElementsByTagName("svg")
    console.log(svg)
    if(svg != null && svg.length > 0)
    {
        d3.select("svg").remove();
    }
}

$(document).ready(function ()
{
    remove_old_gantt()
    showGantt()
    $('#load_file_button').click(function ()
    {
        $('#file_dialog').click()
    })
 
    $('#file_dialog').change(function ()
    {
        remove_old_gantt()
        // Create a reader object
        var reader = new FileReader();
        if (this.files.length)
        {
            var textFile = this.files[0];
            // Read the file
            reader.readAsText(textFile);
            // When it's loaded, process it
            $(reader).on('load', processFile);
        }
    })
})

