'use client';
import Link from 'next/link'
import {
  Disclosure,
  Menu,
  Transition,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navigator from './DivNav';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Breeds', href: '/breeds', current: false },
  { name: 'Who are we?', href: '/about', current: false },
  { name: 'Contact Us', href: '/contact-us', current: false },
]

type User = {
  email: string;
  username: string;
  updatedAt: string;
  _id: string;
};

interface HeaderProps {
  bgcolor?: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Header: React.FC<HeaderProps> = ({ bgcolor }) => {


  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  const GetUser = async () => {
    try {
      const res = await axios.get('/api/user')

      console.log(res.data["data"]['_id']);

      setUser(res.data["data"])

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    GetUser();
  }, [])

  const HandleLogout = async () => {

    try {
      const res = await axios.get("api/auth/logout")
      router.push("/login")

    } catch (error) {
      console.log(error);

    }

  }
  console.log();

  return (
    <Disclosure as="nav" className={bgcolor ? bgcolor : "bg-transparent"}>
      {({ open }: { open: boolean }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center ">
                  <img
                    className="h-8 w-auto"
                    src="/d_grommers.png"
                    alt="D_Groomer"

                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 justify-center">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className=" text-black text-sm hover:bg-gray-200 rounded-md px-3 py-2  font-medium "
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >

                    {user != null ? (
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Hi, {user?.username}
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/my-account"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Account
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/my-account/my-pets"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Pets
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/my-account/schedules"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Schedules
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href=''
                              onClick={HandleLogout}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm pointer text-gray-700')}
                            >
                              Log out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    ) : (
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-auto origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className='flex p-3'>
                          <Navigator path='/login' styles='bg-violet-900 min-w-24 h-11 hover:bg-violet-600 text-white font-bold text-center justify-center rounded flex items-center mr-3'>
                            Log In
                          </Navigator>

                          <Navigator path='/signup' styles='bg-violet-900 min-w-24 h-11 hover:bg-violet-600 text-white font-bold text-center justify-center rounded flex items-center'>
                            Sign Up
                          </Navigator>
                        </div>
                      </Menu.Items>

                    )}


                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Header
