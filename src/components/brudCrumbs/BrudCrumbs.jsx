import React from 'react'
import {Box,Breadcrumbs,Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const BrudCrumbs = ({ breadcrumbs }) => {
  return (
    <div className=' h-[30px]  w-[100%] vvsm:invisible md:visible  flex justify-start items-center'>
       <div className='md:ml-[50px] '>
       <Box m={2}>
        <Breadcrumbs aria-label='breadcrumb' separator={<NavigateNextIcon fontSize='10px' className='vvsm:mt-[3px] md:mb-[3px]'/>}>
        {breadcrumbs?.map((breadcrumb, index) => (
              <Link key={index} to={breadcrumb.path} className='vvsm:text-[10px] md:text-[14px]'>
                {breadcrumb.label}
              </Link>
            ))}
            <Typography color={'text.primary'}></Typography>
        </Breadcrumbs>
    </Box>
       </div>
    </div>
  )
}

export default BrudCrumbs