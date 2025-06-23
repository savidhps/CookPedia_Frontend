import { Component } from '@angular/core';
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { ApiService } from '../../service/api.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import { HighchartsChartComponent } from 'highcharts-angular';



@Component({
  selector: 'app-adminhome',
  imports: [AdminsidebarComponent, AdminheaderComponent,MatCardModule, MatDatepickerModule,HighchartsChartComponent],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css',
})
export class AdminhomeComponent {

  allusers:any=[]=[]
  allRecipes:any[]=[]
  totalCount:any=""

  selected = new Date()

  chartOptions:any={
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Cookpedia website analysis'
    },
    // subtitle: {
    //     text: 'Source: <a ' +
    //         'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
    //         'target="_blank">Wikipedia.org</a>'
    // },
    xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe'],
        title: {
            text: null
        },
        gridLineWidth: 1,
        lineWidth: 0
    },
    yAxis: {
        min: 0,
        title: {
            text: 'users in (millions)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        },
        gridLineWidth: 0
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        bar: {
            borderRadius: '50%',
            dataLabels: {
                enabled: true
            },
            groupPadding: 0.1
        }
    },
    // legend: {
    //     layout: 'vertical',
    //     align: 'right',  
    //     verticalAlign: 'top',
    //     x: -40,
    //     y: 80,
    //     floating: true,
    //     borderWidth: 1,
    //     backgroundColor:
    //         Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
    //     shadow: true
    // },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Year 1990',
        data: [632, 727, 3202, 721]
    }, {
        name: 'Year 2000',
        data: [814, 841, 3714, 726]
    }, {
        name: 'Year 2021',
        data: [1393, 1031, 4695, 745]
    }]
}

  constructor(private api:ApiService){
    // this.chartOptions=
  }

  ngOnInit(){
    // allrecipe count 
    this.api.allRecipesApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allRecipes=res
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
    // allusers 

    this.api.getAllUsersApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allusers=res
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })

    // all downloads

    this.api.getAllDownloadsApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        let count=res.map((item:any)=>item.count).reduce((n1:any,n2:any)=>n1+n2)
        this.totalCount=count
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })

    



    
  }

}
