import { create } from "zustand";
import { supabase } from "./supabaseClient";
import { User } from "@/types/user";

interface AuthState {
    user: User | null;
    isLoading: boolean;
    login:(email:string, password:string) => Promise<void>;
    signup:(
      email:string,
      password:string,
      firstName:string,  
      lastName:string,
      avatar?:string,
    ) => Promise<void>;
    logout: () => Promise<void>;
    error: string | null;
    initializeAuth: () => () => void;

}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,


login: async (email, password) => {
    set({isLoading: true, error: null});
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error){
      set({
        error:error.message,
        isLoading: false,  
      });
      return
    }
    if(data.user){
      set({
        user:{
          id: data.user.id,
          email: data.user.email || '',
          firstName: data.user.user_metadata.firstName,
          lastName: data.user.user_metadata.lastName,
          avatar: data.user.user_metadata.avatar,
          created_at: new Date(data.user.created_at),
          
       },
        isLoading: false,
      })  
    }
},

signup: async(email, password, firstName, lastName, avatar) => {
    const {data, error} = await supabase.auth.signUp({
      email,
      password,
      options:{
        data:{
          firstName,
          lastName
          
          
        },
      }, 
    });
    if(error) throw error
    if (data.user && data.session){
      set({
        user:{
          id: data.user.id,
          email: data.user.email || '',
          firstName: data.user.user_metadata.firstName,
          lastName: data.user.user_metadata.lastName,
          avatar: data.user.user_metadata.avatar,
          created_at: new Date(data.user.created_at),
          
        },
        isLoading: false,
      })  
    }
},
logout: async() => {
  await supabase.auth.signOut();
  set({user:null, isLoading:false, error:null})
},
initializeAuth:()=>{
supabase.auth.getSession().then(({data})=>{
  if(data.session?.user){
    set({
      user:{
        id: data.session.user?.id,
        email: data.session.user?.email || '',
        firstName: data.session.user?.user_metadata.firstName,
        lastName: data.session.user?.user_metadata.lastName,
        created_at: new Date(data.session.user?.created_at),
        
      },
      isLoading: false,
    })
  
  } else{
      set({user: null,isLoading:false})
    }
}).catch((error)=>{
  console.error('Error initializing auth:', error);
  set({user: null, isLoading:false})
})
const {
  data: { subscription },
} = supabase.auth.onAuthStateChange((_event, session) => {
  if (session?.user) {
    set({
      user: {
        id: session.user.id,
        email: session.user.email || "",
        firstName: session.user.user_metadata.firstName,
        lastName: session.user.user_metadata.lastName,
        created_at: new Date(session.user.created_at),
      },
      isLoading: false,
      error: null,
    });
  } else {
    set({ user: null, isLoading: false, error: null });
  }
});
return () => {
  subscription.unsubscribe();
};

}

}))