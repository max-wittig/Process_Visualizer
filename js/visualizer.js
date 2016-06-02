class Visualizer
{
    constructor(export_array)
    {
        this.export_array = export_array
        this.task_array = []
        this.task_names = []
    }

    get_status_based_on_row(row_number)
    {
        switch (row_number % 7)
        {
            case 0: return "bar-color0"
            case 1: return "bar-color1"
            case 2: return "bar-color2"
            case 3: return "bar-color3"
            case 4: return "bar-color4"
            case 5: return "bar-color5"
            case 6: return "bar-color6"
            default: return "bar-color6"
        }
    }

    get_random_status()
    {
        let random = Math.floor((Math.random() * 4) + 1)
        switch (random)
        {
            case 1: return "RUNNING"
            case 2: return "FAILED"
            case 3: return "SUCCEEDED"
            case 4: return "KILLED"
        }
    }

    build_task_array()
    {
        for(let i=0; i < this.export_array.length; i++)
        {
            //projects
            let current_project = this.export_array[i]
            let process_name = current_project.process_name
            this.task_names.push(process_name)
            for(let j=0; j < current_project.task_list.length; j++)
            {
                let current_task = current_project.task_list[j]
                let task =
                {
                    "startDate" : moment(current_task.start_time*1000).toDate(),
                    "endDate"   : moment(current_task.end_time*1000).toDate(),
                    "taskName"  : process_name,
                    "status"    : this.get_status_based_on_row(i)

                }
                this.task_array.push(task)
            }
        }
    }

    get_task_array()
    {
        return this.task_array
    }

    get_task_names()
    {
        return this.task_names
    }

    get_min_date()
    {
        let min_date = moment(Number.MAX_SAFE_INTEGER).toDate()
        for(let i=0; i < this.task_array.length; i++)
        {
            if(this.task_array[i].startDate < min_date)
            {
                min_date = this.task_array[i].startDate
            }
        }
    }

    get_max_date()
    {
        let max_date = moment(0).toDate()
        for(let i=0; i < this.task_array.length; i++)
        {
            if(this.task_array[i].startDate > max_date)
            {
                max_date = this.task_array[i].startDate
            }
        }
        return max_date
    }

    get_time_domain()
    {
        return [this.get_min_date(), this.get_max_date()]
    }

    show()
    {
        var taskStatus = {
            "bar-color0" : "bar-color0",
            "bar-color1" : "bar-color1",
            "bar-color2" : "bar-color2",
            "bar-color3" : "bar-color3",
            "bar-color4" : "bar-color4",
            "bar-color5" : "bar-color5",
            "bar-color6" : "bar-color6"
        };


        let tasks = this.get_task_array()
        var format = "%H:%M:%S"
        let taskNames = this.get_task_names()
        var gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format)
        gantt.timeDomainMode("fit")
        gantt(tasks)
    }


}
