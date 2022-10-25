def clean_role(role: str):
    if role is None:
        return ""
    t_o_a = "Type of aircraft"
    if role.__contains__(t_o_a):
        return role.split(t_o_a)[0].strip()

    return role.strip()
