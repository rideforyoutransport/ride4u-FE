import * as IoIcons from 'react-icons/io';
import { FaProductHunt } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { MdCategory } from 'react-icons/md';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { CgUserList } from 'react-icons/cg';
import { VscDiffAdded ,VscListFilter } from 'react-icons/vsc';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { AiOutlineQrcode } from 'react-icons/ai';
import { BsPrinter } from 'react-icons/bs';
import { VscActivateBreakpoints } from 'react-icons/vsc';
import { GrGift } from 'react-icons/gr';
import { MdSchema } from 'react-icons/md';
import { BiCube } from 'react-icons/bi';
import { ImProfile } from 'react-icons/im';
import { RiListSettingsLine } from 'react-icons/ri';



export const navbar ={
    type:"tenant",
    item:[
        {
            title: 'Main',
            path: 'tenant',
            icon: <AiOutlineUsergroupDelete/>,
            heading:true
          }, 
          {
            title: 'Dashboard',
            path: 'dashboard',
            icon: <BiCube/>,
            heading:false
          },
          {
            title: 'Company Profile',
            path: 'tenantProfile',
            icon: <ImProfile/>,
            heading:false
          },
          {
            title: 'Settings',
            path: 'tenantMaster',
            icon: <RiListSettingsLine/>,
            heading:false
          },
          {
            title: 'User',
            path: '',
            icon: <AiOutlineUsergroupDelete />,
            heading:true
          },
          {
            title: 'Vendor Users',
            path: 'vendorUsers',
            icon: <AiOutlineUsergroupDelete />,
            heading:false
          },
          {
            title: 'User Roles',
            path: 'userRoles',
            icon: <CgUserList />,
            heading:false
          },
          {
            title: 'Product',
            path: '',
            icon: <FaProductHunt/>,
            heading:true
          },
          {
            title: 'Product Category',
            path: 'productCategory',
            icon: <BiCategory/>,
            heading:false
          },
          {
            title: 'Product Sub Category',
            path: 'productSubCategory',
            icon: <MdCategory />,
            heading:false
          },
          {
            title: 'Add Product',
            path: 'addProd',
            icon: <VscDiffAdded />,
            heading:false
          },
          {
            title: 'All Products',
            path: 'allProducts',
            icon: <AiOutlineUnorderedList/>,
            heading:false
          },
          {
            title: 'Batch Creation',
            path: 'batchCreation',
            icon: <MdOutlineCreateNewFolder/>,
            heading:false
          },
          {
            title: 'QR Code Generation',
            path: 'generateQr',
            icon: <AiOutlineQrcode />,
            heading:false
          },
          {
            title: 'QR Code Print',
            path: 'printQr',
            icon: <BsPrinter/>,
            heading:false
          },
          {
            title: 'Product Points',
            path: 'productPoints',
            icon: <VscActivateBreakpoints />,
            heading:false
          },
          {
            title: 'Gifts',
            path: '',
            icon: <GrGift />,
            heading:true
          },  
          {
            title: 'All Gifts',
            path: 'allGifts',
            icon: <GrGift />,
            heading:false
          },  
          {
            title: 'All Redemptions ',
            path: 'allGiftRedemptions',
            icon: <VscListFilter />,
            heading:false
          },  
          {
            title: 'Gift Schemes ',
            path: 'allGiftSchemes',
            icon: <MdSchema />,
            heading:false
          },  


        
    ]
};
