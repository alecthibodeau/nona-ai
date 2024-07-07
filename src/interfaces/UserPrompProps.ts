interface UserPromptProps {
  prompt: (prompText: string) => Promise<string>;
}

export default UserPromptProps;
