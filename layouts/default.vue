<template>
  <div class="min-h-screen">
    <SidebarProvider>
      <Sidebar
        :open="isSidebarOpen"
        class="fixed left-0 top-0 h-full z-40"
        collapsible="icon"
      >
        <SidebarHeader>
          <div class="flex flex-col justify-center items-center gap-2">
            <img src="https://picsum.photos/100/100" class="w-[80px] h-auto" />
            <span v-if="isSidebarOpen">Shadcn Nuxt Template</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu v-for="item in sidebarItems" :key="item.id">
                <SidebarMenuItem
                  v-if="!item.submenu"
                  class="hover:dark:bg-gray-800 hover:bg-gray-100"
                >
                  <SidebarMenuButton asChild>
                    <a :href="item.href">
                      <Icon :name="item.icon" size="icon" />
                      <span v-if="isSidebarOpen">{{ item.label }}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <Collapsible v-else v-model:open="openSubmenus[item.id]">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuItem
                      class="hover:dark:bg-gray-800 hover:bg-gray-100"
                    >
                      <SidebarMenuButton>
                        <Icon :name="item.icon" size="icon" />
                        <span v-if="isSidebarOpen">{{ item.label }}</span>
                        <Icon
                          v-if="isSidebarOpen"
                          name="lucide:chevron-down"
                          class="ml-auto h-4 w-4 transition-transform duration-200"
                          :class="{ 'rotate-180': openSubmenus[item.id] }"
                        />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleTrigger>
                  <CollapsibleContent v-if="isSidebarOpen" class="pl-4">
                    <SidebarMenu
                      v-for="subItem in item.submenu"
                      :key="subItem.id"
                    >
                      <SidebarMenuItem
                        class="hover:dark:bg-gray-800 hover:bg-gray-100"
                      >
                        <SidebarMenuButton asChild>
                          <a :href="subItem.href">
                            <span v-if="isSidebarOpen">{{
                              subItem.label
                            }}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                @click="toggleDarkMode"
                class="hover:dark:bg-gray-800 hover:bg-gray-100"
              >
                <div>
                  <Icon
                    :name="
                      colorMode.preference === 'light'
                        ? 'lucide:moon'
                        : 'lucide:sun'
                    "
                    size="icon"
                  />
                  <span v-if="isSidebarOpen">{{
                    colorMode.preference === 'light'
                      ? 'Dark Mode'
                      : 'Light Mode'
                  }}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <DropdownMenu v-model:open="isUserMenuOpen">
              <DropdownMenuTrigger>
                <SidebarMenuItem class="flex items-center gap-2">
                  <SidebarMenuButton asChild>
                    <Avatar shape="circle" class="h-10 w-10">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span v-if="isSidebarOpen">User</span>
                    <Icon
                      v-if="isSidebarOpen"
                      name="lucide:chevron-right"
                      class="ml-auto h-4 w-4 transition-transform duration-200"
                    />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <main class="transition-all duration-300 w-full">
        <div class="px-4 py-2 flex flex-row items-center gap-4">
          <SidebarTrigger @click="toggleSidebar" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator v-if="route.path !== '/'" />
              <template
                v-for="(crumb, index) in route.path.split('/').filter(Boolean)"
                :key="index"
              >
                <BreadcrumbItem>
                  <BreadcrumbLink
                    v-if="
                      index < route.path.split('/').filter(Boolean).length - 1
                    "
                    :href="
                      router.options.routes.find((r) => r.path === route.path)
                        ? '#'
                        : '/' +
                          route.path
                            .split('/')
                            .filter(Boolean)
                            .slice(0, index + 1)
                            .join('/')
                    "
                  >
                    {{ crumb.charAt(0).toUpperCase() + crumb.slice(1) }}
                  </BreadcrumbLink>
                  <BreadcrumbPage v-else>
                    {{ crumb.charAt(0).toUpperCase() + crumb.slice(1) }}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator
                  v-if="
                    index < route.path.split('/').filter(Boolean).length - 1
                  "
                />
              </template>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div class="p-6">
          <slot />
        </div>
      </main>
    </SidebarProvider>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { cn } from '@/lib/utils';

const colorMode = useColorMode();
const isSidebarOpen = ref(true);
const isUserMenuOpen = ref(false);
const openSubmenus = ref({} as Record<string, boolean>);
const user = ref({
  name: 'John Doe',
  image: 'https://picsum.photos/100/100'
});
const route = useRoute();
const router = useRouter();

const sidebarItems = ref([
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'lucide:home',
    href: '#'
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'lucide:users',
    submenu: [
      {
        id: 'users-add',
        label: 'Add',
        icon: 'lucide:user-plus',
        href: '/users/add'
      },
      {
        id: 'users-manage',
        label: 'Manage',
        icon: 'lucide:users',
        href: '#'
      }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'lucide:settings',
    href: '#',
    submenu: [
      {
        id: 'users-add',
        label: 'Add',
        icon: 'lucide:user-plus',
        href: '#'
      },
      {
        id: 'users-manage',
        label: 'Manage',
        icon: 'lucide:users',
        href: '#'
      }
    ]
  }
]);

const breadcrumbItems = computed(() => {
  const breadcrumbItems = [];
  const path = route.path.split('/');
  const pathName = route.meta.name;
});

const toggleDarkMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const toggleSubmenu = (key: keyof typeof openSubmenus.value) => {
  openSubmenus.value = {
    ...openSubmenus.value,
    [key]: !openSubmenus.value[key]
  };
};

const linkIsNumber = (link: string) => {
  return /^[0-9]*$/.test(link);
};
</script>
