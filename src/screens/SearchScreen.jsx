import React, {useEffect, useState} from "react";
import Header from "../components/header";
import '../styles/searchBuild.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import {CONTACTLEVEL} from '../mock-data/contactlevel-data';
import {COUNTRY} from '../mock-data/country-data';
import {STATE} from '../mock-data/state-data';
import {CITY} from '../mock-data/city-data';
import {ZIPCODE} from '../mock-data/zipcode-data';
import {METROAREA} from '../mock-data/metroarea-data';
import {COUNTY} from '../mock-data/county-data';
import {SICCODE} from '../mock-data/siccode-data';
import {NAICSCODE} from '../mock-data/naicscode-data';
import {WEBSITESEARCH} from '../mock-data/websitesearch-data';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useLocation, useNavigate } from "react-router";
import Result from "./Result";
import { Controller, useForm } from "react-hook-form";
import axios from 'axios';






/*
 TODO: 
 formGroupSearch: {
  contactLevel: {
    title: ''
  }

  locations: {

  }

 }
*/
const SearchScreen = () => {
    const [selectedMenu, setSelectedMenu] = useState('showAll');
    const [tableView, setTableView] = useState(false);
    const [rows, setRows] = useState([]);
    const {control, getValues, register} = useForm({
      mode: 'onBlur',
      defaultValues: {
        contact: {
          contacttitle: '',
           contactlevel: ''
        },
        country: {
          companycountry: '',
          companystate: '',
          companycity: '',
          companyzipcode: '',
          metroarea: '',
          companycounty: ''
        },
          company: {
            Companyemployees: '',
            Companyemployees: '',
            CompanyRevenue: '',
            CompanyRevenue: '',
        
        },
        industry: {
          siccode: '',
          naicscode: '',
                  
        },
        additional: {
          company_search: '',
          website_search: '',
          
        
        }
      }
    })
    const filterOptions = (object) => {
      let val = [];
      for(let obj in object) {
        if(object.hasOwnProperty(obj)) {
          if(!!object[obj] && typeof object[obj] === 'string') {
            val.push(`${obj}=${object[obj]}`)
          } else if(!!object[obj] && Array.isArray(object[obj])) {
            val.push(`${obj}=${object[obj].join('|')}`)
          }
        }
      }
      return val.join(',')
    }
    const selectedMenuClick = (selectedMenuName) => {
        setSelectedMenu(selectedMenuName);
       
    }
    const {state} = useLocation();
    const navigate = useNavigate();
   // selectedMenuClick(state)


   const clickViewBtn = () => {
    let conditions = []
    const filters = getValues();
    for(let obj in filters) {
      console.log(filters[obj])
      const contact = filterOptions(filters[obj]);
      console.log(!!contact)
      if(!!contact) {
        conditions.push(contact)
      }
    }
    axios.post('/getdata',{
      conditions: conditions.join(',')
    }).then(data => {
      console.log(data.data.data);
      if(data.data.data) {
        setRows(data.data.data)
      }
      // 
    })
    .catch(error => {
      setRows([]);
      console.log('####', error)
    })

    
    setTableView(true);
   }

   useEffect(() => {
    if(state) {
      setSelectedMenu(state.name)
      navigate('/searchs', {})
    }
   
   }, [selectedMenu, state, navigate])

   const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    'C-Level',
    'V-Level',
    'D-Level',
    'M-Level',
    'Other-Level'
    // Add more options as needed
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSelectAll = () => {
    if (selectedOptions.length === options.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(options);
    }
  };

  const [count, setCount] = useState(0);

  const handleResultClick = () => {

    const newCount = 10; 
    setCount(newCount);
  };




     return (

  
    <>
    
     <Header></Header>
         
     <div className="containers">
      { !tableView && 
        <><div className="search">
             <ul>
               <li><div className="searchForm">
                 <span><PersonSearchRoundedIcon /></span>

                 <span>
                   <input placeholder="search for company" type="text" />
                 </span>
               </div></li>
               <li onClick={handleResultClick}>
      {count === 0 ? "0 Result" : `${count} Result${count !== 1 ? "s" : ""}`}
    </li>
               <li>Clear All</li>
               <li><div className="searchForm">

                 <span>
                   <input placeholder="Find Filter" type="text" />
                 </span>
               </div></li>
               <li><div className="view">

                 <span>
                   <Button variant="view"
                      onClick={() => clickViewBtn()} >View Result</Button>
                      </span>
               </div></li>
             </ul>
           </div><div className="top-menu">
               <ul>
                 <li onClick={() => selectedMenuClick('Contact Level')}
                   className={selectedMenu === 'Contact Level' ? 'selected' : ''}>Contact Level</li>
                 <li onClick={() => selectedMenuClick('Location')}
                   className={selectedMenu === 'Location' ? 'selected' : ''}>Location</li>
                 <li onClick={() => selectedMenuClick('Company Size')}
                   className={selectedMenu === 'Company Size' ? 'selected' : ''}>Company Size</li>
                 <li onClick={() => selectedMenuClick('Industry')}
                   className={selectedMenu === 'Industry' ? 'selected' : ''}>Industry</li>
                 <li onClick={() => selectedMenuClick('Additional')}
                   className={selectedMenu === 'Additional' ? 'selected' : ''}>Additional</li>
               </ul>
             </div><div className="contant">
               {(selectedMenu === 'Contact Level' || selectedMenu === 'showAll') && <Box sx={{ width: '100%' }}>
                 <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                   <Grid item xs={12}>
                     <div className="maintitle">Contact</div>
                   </Grid>
                   <Grid item xs={6}>
                     <div className="subtitle">
                       <label>Contact Level</label>
                       
                       <Controller 
                          control={control}
                          name='contact.contactlevel'
                          render={({field: {onChange, value, ref}}) => (
                           <> <Autocomplete
                         
                         multiple
                         disablePortal
                        //  id="combo-box-demo"
                         options={CONTACTLEVEL}
                         sx={{ width: 300 }}
                         getOptionLabel={(option) => option.label}
                         renderInput={(params) => (<TextField {...params}
                         label="Contact Level"
                         inputRef={ref}
                          />)} 
                         
                          onChange={(event, item) => {
                            console.log(item.map(val => val.label))
                            onChange(item.map(val => val.label));
                          }}
                          
                          />̥
                         </>
                          )}
                         
                       />
                       
                       </div>
                       
                     
                     
                   </Grid>
                   <Grid item xs={6}>
                     <div className="subtitle">

                       <label>Title</label>
                       <input type="text" {...register("contact.contacttitle")}/></div>
                   </Grid>

                 </Grid>
               </Box>
               }

               {(selectedMenu === 'Location' || selectedMenu === 'showAll') && <Box sx={{ width: '100%' }}>
                 <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                   <Grid item xs={12}>
                     <div className="maintitle">locations</div>
                   </Grid>
                   <Grid item xs={6}>
                     <div className="subtitle">

                       <label>Country</label>
                       <Controller 
                          control={control}
                          name='country.companycountry'
                          render={({field: {onChange, value, ref}}) => (
                           <> <Autocomplete
                         multiple
                         disablePortal
                        //  id="combo-box-demo"
                         options={COUNTRY}
                         sx={{ width: 300 }}
                         getOptionLabel={(option) => option.label}
                         renderInput={(params) => (<TextField {...params}
                         label="Country"
                         inputRef={ref}
                         
                          />)} 
                         
                          onChange={(event, item) => {
                            console.log(item.map(val => val.label))
                            onChange(item.map(val => val.label));
                          }}
                          
                          />̥
                         </>
                          )}
                         
                       />
                       </div>
                   </Grid>
                   <Grid item xs={6}>
                     <div className="subtitle">

                       <label>State</label>
                       <Controller 
                          control={control}
                          name='country.companystate'
                          render={({field: {onChange, value, ref}}) => (
                           <> <Autocomplete
                         
                         multiple
                         disablePortal
                        //  id="combo-box-demo"
                         options={STATE}
                         sx={{ width: 300 }}
                         getOptionLabel={(option) => option.label}
                         renderInput={(params) => (<TextField {...params}
                         label="Company State"
                         inputRef={ref}
                          />)} 
                         
                          onChange={(event, item) => {
                            console.log(item.map(val => val.label))
                            onChange(item.map(val => val.label));
                          }}
                          
                          />̥
                         </>
                          )}
                         
                       />
                       </div>
                   </Grid>

                   <Grid item xs={6}>
                     <div className="subtitle">

                       <label>City</label>
                       <Controller 
                          control={control}
                          name='country.companycity'
                          render={({field: {onChange, value, ref}}) => (
                           <> <Autocomplete
                          
                         multiple
                         disablePortal
                        //  id="combo-box-demo"
                         options={CITY}
                         sx={{ width: 300 }}
                         getOptionLabel={(option) => option.label}
                         renderInput={(params) => (<TextField {...params}
                         label="Company City"
                         inputRef={ref}
                          />)} 
                         
                          onChange={(event, item) => {
                            console.log(item.map(val => val.label))
                            onChange(item.map(val => val.label));
                          }}
                          
                          />̥
                         </>
                          )}
                         
                       /></div>
                   </Grid>
                   <Grid item xs={6}>
                     <div className="subtitle">

                       <label>Zip Code</label>
                       <Controller 
                          control={control}
                          name='country.companyzipcode'
                          render={({field: {onChange, value, ref}}) => (
                           <> <Autocomplete
                          
                         multiple
                         disablePortal
                        //  id="combo-box-demo"
                         options={ZIPCODE}
                         sx={{ width: 300 }}
                         getOptionLabel={(option) => option.label}
                         renderInput={(params) => (<TextField {...params}
                         label="Company ZipCode"
                         inputRef={ref}
                          />)} 
                         
                          onChange={(event, item) => {
                            console.log(item.map(val => val.label))
                            onChange(item.map(val => val.label));
                          }}
                          
                          />̥
                         </>
                          )}
                         
                       /></div>
                   </Grid>

                   <Grid item xs={6}>
                     <div className="subtitle">

                       <label>Metro Area</label>
                       <Controller 
                          control={control}
                          name='country.metroarea'
                          render={({field: {onChange, value, ref}}) => (
                           <> <Autocomplete
                          
                         multiple
                         disablePortal
                        //  id="combo-box-demo"
                         options={METROAREA}
                         sx={{ width: 300 }}
                         getOptionLabel={(option) => option.label}
                         renderInput={(params) => (<TextField {...params}
                         label="Metro Area"
                         inputRef={ref}
                          />)} 
                         
                          onChange={(event, item) => {
                            console.log(item.map(val => val.label))
                            onChange(item.map(val => val.label));
                          }}
                          
                          />̥
                         </>
                          )}
                         
                       /></div>
                   </Grid>
                   <Grid item xs={6}>
                     <div className="subtitle">

                       <label>County</label>
                       <Controller 
                          control={control}
                          name='country.companycounty'
                          render={({field: {onChange, value, ref}}) => (
                           <> <Autocomplete
                           
                         multiple
                         disablePortal
                        //  id="combo-box-demo"
                         options={COUNTY}
                         sx={{ width: 300 }}
                         getOptionLabel={(option) => option.label}
                         renderInput={(params) => (<TextField {...params}
                         label="Company County"
                         inputRef={ref}
                          />)} 
                         
                          onChange={(event, item) => {
                            console.log(item.map(val => val.label))
                            onChange(item.map(val => val.label));
                          }}
                          
                          />̥
                         </>
                          )}
                         
                       /></div>
                   </Grid>

                 </Grid>
               </Box>}


               {(selectedMenu === 'Company Size' || selectedMenu === 'showAll') && <Box sx={{ width: '100%' }}>
                 <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                   <Grid item xs={12}>
                     <div className="maintitle">Company Size</div>
                   </Grid>
                   <Grid item xs={6}>
                     <div className="subtitle">

                       <label>Employee Size From </label>
                       <input type="text"  {...register("company.companyemployees")}/></div>
                   </Grid>
                   <Grid item xs={6}>
                     <div className="subtitle">

                       <label>Employee Size To </label>
                       <input type="text" {...register("company.companyemployees")}/></div>
                   </Grid>

                   <Grid item xs={6}>
                     <div className="subtitle">

                       <label>Revenue Size From</label>
                       <input type="text" {...register("company.companyrevenue")}/></div>
                   </Grid>
                   <Grid item xs={6}>
                     <div className="subtitle">

                       <label>Revenue Size to</label>
                       <input type="text" {...register("company.Companyrevenue")}/></div>
                   </Grid>

                 </Grid>
               </Box>}

               {(selectedMenu === 'Industry' || selectedMenu === 'showAll') && <Box sx={{ width: '100%' }}>
                 <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                   <Grid item xs={12}>
                     <div className="maintitle">Industry</div>
                   </Grid>
                   <Grid item xs={6}>
                     <div className="subtitle">

                       <label>SIC Code and Industry</label>
                       <Controller 
                          control={control}
                          name='industy.siccode'
                          render={({field: {onChange, value, ref}}) => (
                           <> <Autocomplete
                          
                         multiple
                         disablePortal
                        //  id="combo-box-demo"
                         options={SICCODE}
                         sx={{ width: 300 }}
                         getOptionLabel={(option) => option.label}
                         renderInput={(params) => (<TextField {...params}
                         label="Sic Code"
                         inputRef={ref}
                          />)} 
                         
                          onChange={(event, item) => {
                            console.log(item.map(val => val.label))
                            onChange(item.map(val => val.label));
                          }}
                          
                          />̥
                         </>
                          )}
                         
                       /></div>
                   </Grid>
                   <Grid item xs={6}>
                     <div className="subtitle">

                       <label>NAICS Code</label>
                       
                       <Controller 
                          control={control}
                          name='industry.naicscode'
                          render={({field: {onChange, value, ref}}) => (
                           <> <Autocomplete
                           
                         multiple
                         disablePortal
                        //  id="combo-box-demo"
                         options={NAICSCODE}
                         sx={{ width: 300 }}
                         getOptionLabel={(option) => option.label}
                         renderInput={(params) => (<TextField {...params}
                         label="NAICS Code"
                         inputRef={ref}
                          />)} 
                         
                          onChange={(event, item) => {
                            console.log(item.map(val => val.label))
                            onChange(item.map(val => val.label));
                          }}
                          
                          />̥
                         </>
                          )}
                         
                       />
                       
                       </div>
                   </Grid>

                 </Grid>
               </Box>}

               {(selectedMenu === 'Additional' || selectedMenu === 'showAll') && <Box sx={{ width: '100%' }}>
                 <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                   <Grid item xs={12}>
                     <div className="maintitle">Additional</div>
                   </Grid>
                   <Grid item xs={6}>
                     <div className="subtitle">

                       <label>Company Search</label>
                       <input type="text" {...register("company.Company_search")}/>
                       </div>
                   </Grid>
                   <Grid item xs={6}>
                     <div className="subtitle">

                       <label>Website Search</label>
                       <Autocomplete
                       
      disablePortal
      id="combo-box-demo"
      options={WEBSITESEARCH}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Website Search" />}
    /></div>
                   </Grid>

                 </Grid>
               </Box>}

             </div></>}
             {tableView && <Result Rows={rows}/>}
     </div>
    </>
   )
}

export default SearchScreen;