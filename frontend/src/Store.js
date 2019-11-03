import React from 'react';
import axios from 'axios';

export default class Store {
    
    state = {
        base: 'https://us-south.functions.cloud.ibm.com/api/v1/web/ssundar%40iastate.edu_dev/',
        data: []
    }
    
    deleteRequest = (id,rev) => {
        console.log("preparing to delete");
        console.log(id+", "+rev);
        return axios.delete(this.state.base+"default/delete.json", {
            data:{
                "id":id,
                "rev":rev
            }
          }).then(()=>{
            this.fetchRequests();
          }).catch(e=>{
              console.log(e);
          })
    }
    fetchRequests = () =>{
        console.log("fetching");
        return axios({
            url: this.state.base+`getData/getData.json`,
            method: 'get',
            timeout: 8000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
       .then(res => {
            let data = [];
            res.data.rows.forEach((d)=> {
                let needStr = d.doc.needs;
                let narr = JSON.parse(needStr.replace("]","").replace("[","").trim());
                narr = narr.split(',');
                let phoneStr = d.doc.phone;
                let phone = phoneStr.substring(0,3)+"-"+phoneStr.substring(3,6)+"-"+phoneStr.substring(6,10);
            
                let o = {
                    id: d.id,
                    rev: d.doc._rev,
                    name: d.doc.name,
                    phone: phone,
                    lat: parseFloat(d.doc.lat),
                    lng: parseFloat(d.doc.lng),
                    needs: narr,
                };
                data.push(o);
            });
            console.log(data);
            return data;
       })
       .catch (err => console.error(err))
    
        
    }
    async getAllRequests(){
        console.log(this.state.data.length);
        if(this.state.data.length === 0){
            console.log("need to get requestz");
            return await this.fetchRequests();
        }else{
            return this.state.data;
        }
    }
}

