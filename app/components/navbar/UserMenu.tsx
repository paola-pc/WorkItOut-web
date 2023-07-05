'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();

  const toggleOpen = useCallback(() => {
    setIsOpen(value => !value);
  }, [])

  return ( 
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => null}  
          className="
            hidden
            md:block
            text-sm
            font-bold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          "
        >
          Create Workout
        </div>
        <div id="user-menu"
          onClick={toggleOpen} 
          className="
            p-4
            md:py-1 md:px-2
            border-[1px]
            border-neutral-200
            flex flex-row items-center
            gap-3
            rounded-4
            cursor-pointer
            hover:shadow-md
            transition
          "
        >
          <AiOutlineMenu />
          <div className='hidden lg:block'>
              <Avatar />
          </div>
        </div>
      </div>
      {/* The actual menu: */}
      {isOpen && (
        <div
          className='
            absolute
            rounded-xl
            shadow-md
            w-[50vw]
            md:w-3/4
            min-w-[100px]
            bg-white
            overflow-hidden
            top-12
            md:right-0
            lg:right-0
            text-sm
          '>
          <div className='flex flex-col cursor-pointer'>
            <>
              <MenuItem
                onClick={() => { }}
                label="Login"
              />
              <MenuItem
                onClick={registerModal.onOpen}
                label="Register"
              />
          
            </>
          </div>
        </div>
          )
      }
    </div>
   );
}
 
export default UserMenu;